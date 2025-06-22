package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	_ "github.com/eqsdxr/twitter-clone-api/docs"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Accept")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")

		c.Next()
	}
}

var defaultPostLimit = 10

func getUserByID(users []User, id int) (User, error) {
	for _, u := range users {
		if u.ID == id {
			return u, nil
		}
	}
	return User{}, fmt.Errorf("user not found")
}

func main() {
	r := gin.Default()

	r.Use(CORSMiddleware())
	r.Use(gzip.Gzip(gzip.DefaultCompression))

	db := GetDB()

	v1 := r.Group("/v1")

	v1.GET("/posts", func(c *gin.Context) {
		offset, err := strconv.Atoi(c.Query("offset"))
		if err != nil {
			offset = 0
		}
		if offset > len(db.Posts) {
			offset = len(db.Posts)
		}

		postLimit := min(len(db.Posts), offset + defaultPostLimit)
		posts := db.Posts[offset:postLimit]
		if posts == nil {
			c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"Message": "Could not get posts"})
			return
		}

		data := make([]PostResponse, defaultPostLimit)
		for idx, p := range posts {
			data[idx].User, _ = getUserByID(db.Users, p.UserID)
			data[idx].Post = p
			for _, c := range db.Comments {
				if c.PostID == p.ID {
					user, _ := getUserByID(db.Users, p.UserID)
					data[idx].Comments = append(data[idx].Comments, CommentResponse{c, user})
				}
			}
		}

		c.JSON(http.StatusOK, gin.H{"results": data})
	})

	v1.GET("/posts/:id/media", func(c *gin.Context) {
		id := c.Param("id")
		postId, err := strconv.Atoi(id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"Message": "Invalid ID"})
			return
		}
		for _, p := range db.Posts {
			if p.ID == postId {
				c.JSON(http.StatusOK, gin.H{"results": p})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{"results": "not found"})
	})


	v1.GET("/posts/:id", func(c *gin.Context) {
		id := c.Param("id")
		postId, err := strconv.Atoi(id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"Message": "Invalid ID"})
			return
		}
		for _, p := range db.Posts {
			if p.ID == postId {
				c.JSON(http.StatusOK, gin.H{"results": p})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{"results": "not found"})
	})

	v1.GET("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		userId, err := strconv.Atoi(id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"Message": "Invalid ID"})
			return
		}
		for _, u := range db.Users{
			if u.ID == userId {
				c.JSON(http.StatusOK, gin.H{"results": u})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{"results": "not found"})
	})

	v1.GET("/comments/:id", func(c *gin.Context) {
		id := c.Param("id")
		commentId, err := strconv.Atoi(id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"Message": "Invalid ID"})
			return
		}
		for _, com := range db.Comments{
			if com.ID == commentId {
				c.JSON(http.StatusOK, gin.H{"results": com})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{"results": "not found"})
	})

	// Swagger docs
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	port := os.Getenv("PORT")

	log.Printf("\n\n PORT: %s \n ENV: %s \n SSL: %s \n Version: %s \n\n", port, os.Getenv("ENV"), os.Getenv("SSL"), os.Getenv("API_VERSION"))

	if os.Getenv("SSL") == "TRUE" {

		//Generated using sh generate-certificate.sh
		SSLKeys := &struct {
			CERT string
			KEY  string
		}{
			CERT: "./cert/myCA.cer",
			KEY:  "./cert/myCA.key",
		}

		r.RunTLS(":"+port, SSLKeys.CERT, SSLKeys.KEY)
	} else {
		r.Run(":" + port)
	}
}
