// pages/posts/moremovie/moremovie.js
var app = getApp()
var movies = require("../../../data/data.js")
Page({
  data :{
     dataurl : ""
  },


  onLoad: function (options) {
    var that = this;
    var category = options.category;
    this.data.navigateTitle = category;
    var dataurl = "";
    switch ("category") {
      case "北美热映":
        dataurl = ` http://t.yushu.im/v2/movie/in_theaters` ;
        break;
      case "即将上映":                                                    
        dataurl = ` http://t.yushu.im`  + ` /v2/movie/coming_soon` ;
        break;
      case "top250":
        dataurl = ` http://t.yushu.im`  + ` /v2/movie/top250` ;
        break;
    }

    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })

    this.getlist(dataurl)
  },

  getlist: function () {
    wx.request({
      url: dataurl,
      success: function (res) {
        that.handle(res.data)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  handle: function (movieDouban) {
    var movie = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movie.push(temp)
    }
    var okdata = {};
    okdata = {
      movie: movie
    }
    this.setData(okdata)
  }
}

)