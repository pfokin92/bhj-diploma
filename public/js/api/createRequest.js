/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options, callback) => {
    let xhr = new XMLHttpRequest();

    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    let url, formData = {};

    if (options.method === 'GET'){
        url = options.url + '?';
        for(let key in options.data){
            url += key + "=" + options.data[key] + '&';
            
        }
        url = url.slice(0,-1);
    } else {
        formData = new formData();
        for (let key in options.data)
        {
            formData.append(key, options.data[key]);
        }
    }

    xhr.open(options.method, url);

    // xhr.send(formData);

    xhr.onload = () =>{
        if (xhr.response.success){
            callback (null, xhr.response);
        }
    }

    try {
        xhr.send(formData);

    }
    catch (err){
        options.callback(err);
    }


    
    // xhr.onerror = () => {alert('Ошибка сервера');}
    return xhr;

};
