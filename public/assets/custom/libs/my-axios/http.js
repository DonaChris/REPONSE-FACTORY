/**
 * Se sert de la library Axios pour réaliser des 
 * requetes HTTP avec les détails bien orgonasé
 */
class Http {
  static METHOD_POST = "post";
  static METHOD_GET = "get";
  static METHOD_UPDATE = "update";
  static METHOD_DELETE = "delete";
  static METHOD_PATCH = "patch";

  context = this;
  reponse = {body : null, statut : 0, error : null, config : null, callback : null, form: null};

    /**
     * 
     * url: '/user',
     * 
     * method: 'get', // default
     * 
     * will be prepended to `url` unless `url` is absolute.
     * baseURL: 'https://some-domain.com/api/',
     * 
     * headers: {'X-Requested-With': 'XMLHttpRequest'},
     * 
     * params: {
     *   ID: 12345
     * } Method GET only
     * 
     * data: {
     *   firstName: 'Fred'
     * } NOT for Get Method
     * 
     * timeout: 1000, // default is `0` (no timeout)
     * 
     * withCredentials: false, // default
     * 
     *  responseType: 'json', // default
     * 
     *  responseEncoding: 'utf8', // default
     *  xsrfCookieName: 'XSRF-TOKEN', // default
     * 
     *  maxBodyLength: 2000,
     * 
     * maxContentLength: 2000,
     * 
     * onDownloadProgress: function (progressEvent) {
     *   // Do whatever you want with the native progress event
     * }
     * 
     * onUploadProgress: function (progressEvent) {
     *   // Do whatever you want with the native progress event
     * }
     * 
     */
    call(config, callbackFunction, form) 
    {
        let context = this;
        context.reponse.config = config;

        axios(config).then(function (response) {
          // handle success
          context.reponse.statut = 200;
          context.reponse.body = response;
          
        })
        .catch(function (error) {
          console.log(error.response);
          context.reponse.statut = 0;
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              context.reponse.statut = error.response.status;
              context.reponse.error = {statut: error.response.status, 
                                    data : error.response.data, 
                                    header: error.response.headers 
                                  };
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              context.reponse.error = {request : error.request};
            } else {
              // Something happened in setting up the request that triggered an Error
              context.reponse.error = {request : error.message};
            }
        }).then((reponse) => {
          // if error occur
          if (context.reponse.error != null) {
            context.consoleErrorShower(context.response.error);
            return;
          }

          context.reponse.callback = callbackFunction;
          context.reponse.form = form;
          context.onHttpCallback(context.reponse);
        })
    }

    onHttpCallback(response) {
      let getContext = this;
      if ( response.callback !== null ) {
        let fns = response.callback;
        try {
          if (response.form != null && response.form != undefined) {
            fns(response.form, response.body.data);
          } else {
            fns(response.body.data);
          }
        } catch (error) {
          getContext.consoleErrorShower({callbackCallingError: error});
        }
      }
    }

    consoleErrorShower(jsonDetail) {
      console.log('%c--- HTTP Axios ERROR ---', "background: #e2eaf3; color: blue; font-size:16px;");  
      Object.keys(jsonDetail).forEach(key => {
        console.log("%c"+key+" : "+jsonDetail[key], "background: #f1f1f1; color: #202124; font-size:14px;");
      });
      console.log('%c--- END HTTP Axio..  ---', "background: #e2eaf3; color: blue; font-size:16px;");  
    }
}
