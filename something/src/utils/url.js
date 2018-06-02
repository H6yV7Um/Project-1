import {urlParam} from 'config/app';

const getUrl = url => {
    return `${document.location.origin}${url}${urlParam}`;
}

export default getUrl;