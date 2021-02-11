ar; apod = {
  //Create a random date
  randomDate: function(start, end) {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();

    //Change the month and day strings so that they match the documented format.
    if(m < 10){
      m = '0'+m
    }

    if(d < 10){
      d = '0'+d
    }

    return `${y}-${m}-${d}`;
  },

  //Injects the results of the API call into the DOM
  buildDOM: function(result) {
    document.querySelector("#apodTitle").text(result.title);
  
    if(result.media_type === 'video') {
      document.querySelector("#apodImage").hide();
      document.querySelector("#apodVideo > iframe").attr("src", result.url).show();
    }else{
      document.querySelector("#apodVideo").hide();
      document.querySelector("#apodImg").attr("src", result.url).attr('alt', result.title).show();
    }
  
    document.querySelector("#apodCopyright").text("Copyright: " + result.copyright);
    document.querySelector("#apodDate").text("Date: " + result.date);
    document.querySelector("#apodDesc").text(result.explanation);
  },
  
  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key=8C2dz79wy00bn7dLcVmnddOtn3sYcI57BQpNHWw1&date=" + date;
    $.ajax({
        url: url
    }).done(function(result){
        _this.buildDOM(result);
    }).fail(function(result){
      console.log(result);
    });
  },
  
  // Initialization method.
  init: function() {
    this.getRequest();

  },
};
apod.init();

/* https://learn.jquery.com/using-jquery-core/document-ready/ */
document.querySelector(function() {
  document.querySelector('#btnRandApod').addEventListener('click',function(){
    apod.getRequest();
  });
});
