package main

import (
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

func main() {
	// Create file server handler
	fs := http.FileServer(http.Dir("."))

	// Create custom handler
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Log request
		log.Printf("Request: %s %s", r.Method, r.URL.Path)

		// Add CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding")

		// Set content type for CSS files
		if strings.HasSuffix(r.URL.Path, ".css") {
			w.Header().Set("Content-Type", "text/css")
			log.Printf("Setting CSS content type for: %s", r.URL.Path)
		}

		// Set content type for JavaScript files
		if strings.HasSuffix(r.URL.Path, ".js") {
			w.Header().Set("Content-Type", "application/javascript")
			log.Printf("Setting JavaScript content type for: %s", r.URL.Path)
		}

		// Get the path
		path := r.URL.Path

		// If requesting root or empty path
		if path == "/" || path == "" {
			log.Printf("Serving index.html for root path")
			http.ServeFile(w, r, "index.html")
			return
		}

		// Remove leading slash
		cleanPath := strings.TrimPrefix(path, "/")

		// If path has no extension, try to serve HTML file
		if !strings.Contains(filepath.Base(cleanPath), ".") {
			// Try appending .html
			htmlPath := cleanPath + ".html"
			if _, err := http.Dir(".").Open(htmlPath); err == nil {
				log.Printf("Serving HTML file: %s", htmlPath)
				http.ServeFile(w, r, htmlPath)
				return
			}
			// Try appending /index.html
			htmlPath = filepath.Join(cleanPath, "index.html")
			if _, err := http.Dir(".").Open(htmlPath); err == nil {
				log.Printf("Serving index.html from directory: %s", htmlPath)
				http.ServeFile(w, r, htmlPath)
				return
			}
		}

		// Check if file exists
		if _, err := http.Dir(".").Open(cleanPath); err != nil {
			log.Printf("File not found: %s", cleanPath)
			http.NotFound(w, r)
			return
		}

		// Serve static files
		log.Printf("Serving static file: %s", cleanPath)
		fs.ServeHTTP(w, r)
	})

	// Start server
	log.Printf("Starting server on :8000...")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}
}
