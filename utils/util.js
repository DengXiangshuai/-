function http(url, callback){
    wx.request({
        url: url,
        method: 'GET',
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          callBack(res.data);
        },
        fail: function (error) {
          console.log(error)
        }
      })
    }
