



// const headers = {
//   'Accept': 'application/json',
//   'Authorization': token
// }

// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data =>{ let books = data.books; return books})

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

export const initMap = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const googleURL = "https://maps.googleapis.com/maps/api/place/details/json?"
    +"language=en&placeid=ChIJe679Rrl8mQARqtBcHQR1F0o&key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI&callback=initMap";
  fetch(proxyurl + googleURL)
  .then(res => {let sup = res.json(); console.log(res.json); return sup})
  .then(data => {let mapData = data; console.log(data); return mapData})
  .catch(error => console.log(error))

  // const map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: -34.397, lng: 150.644},
  //   zoom: 8
  // });
}
