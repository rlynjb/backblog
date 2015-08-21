// converts underscores' template syntax to {{ }}
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var url = "https://backblog.firebaseio.com",
    root = "http://jsonplaceholder.typicode.com";
