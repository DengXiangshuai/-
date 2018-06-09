// pages/posts/post.js
var movies = require("../../data/data.js")
var movietitle = require("../../data/data.js")
var app = getApp();
Page({
  data: {
    inTheaters:{}
  },
  onmoreTap: function (event) {
    console.log(event)
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "moremovie/moremovie?category=" + category
    })
  },
  onLoad: function () {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" +"?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3"
    this.getMovieListData(inTheatersUrl,"inTheaters","北美热映");
    this.getMovieListData(comingSoonUrl,"comingsoon","即将上映");
    this.getMovieListData(top250Url,"top250","top250")
  },

  getMovieListData: function (url, setkey, categoryTitle) {
    var that = this
    wx.request({
      url: url,
      success: function (res) {
        that.processDoubanData(res.data, setkey, categoryTitle)
        console.log(res.data)
      },
    })
  },
  processDoubanData: function (moviesDouban, setkey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var data = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(data)
    }
    var readyData = {};
    readyData[setkey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)
  }
})