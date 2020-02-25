#!/bin/sh
cd /Users/lishengpeng/Documents/Project/myProject/NodeBlogs/nodeBlog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
