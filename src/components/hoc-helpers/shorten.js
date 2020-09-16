const shorten = (text, limit) => {
    const max = limit <= 2 ? 180 : 120;
    const substr = text.slice(0, max).split(' ').slice(0, -1);
    return text && text.length > max ? `${substr.join(' ')}...` : text
}

export default shorten;