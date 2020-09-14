const checkURL = async(url) => {
    const request = new XMLHttpRequest();
    await request.open('GET', url, true);
    request.onreadystatechange = () => {
        console.log(request.status !== 404)
        return (request.status !== 404);
    };
}

export default checkURL;