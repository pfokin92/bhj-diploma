/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if(options.responseType){
        xhr.responseType = options.responseType;
        xhr.setRequestHeader = options.headers;
    }
    xhr.withCredentials = true;
    let url, formData = {};

    if (options.method === 'GET' && options.id){
        url = options.url + '/'+ options.id;
    } 
    else if (options.method === 'GET'){
        url = options.url + '?';
        for(let key in options.data){
            url += key + "=" + options.data[key] + '&';
            url = url.slice(0,-1);
        }
    }
    else {
        formData = new FormData;

        url = options.url;

        for (let key in options.data)
        {
            formData.append(key, options.data[key]);
        }
    }

    xhr.open(options.method, url);

    xhr.send(formData);

    xhr.onload = () =>{
        if (xhr.response.success){
            callback (null, xhr.response);
        }
        else {
            return callback(xhr.response);
        }
    }

    xhr.onerror = () => {alert('Ошибка сервера');}
    console.log(xhr);

    return xhr.response;


};
