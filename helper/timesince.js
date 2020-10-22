function timesince(createdAt){
    return `${createdAt.getHours()}:${createdAt.getMinutes()}`
}

module.exports = timesince
