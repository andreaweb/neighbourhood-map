



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


//Vicente de Carvalho ID d049ef5048cc95a135790671f0d40b40a50591df
//url https://maps.google.com/?q=Vicente+de+Carvalho,+Rio+de+Janeiro+-+State+of+Rio+de+Janeiro,+Brazil&ftid=0x997cb946fdae7b:0x4a1775041d5cd0aa
//address <span class="extended-address">Vicente de Carvalho</span>, <span class="locality">Rio de Janeiro</span> - <span class="region">State of Rio de Janeiro</span>, <span class="country-name">Brazil</span>
//lat -22.8558216
//long -43.315785
export const initMap = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const googleURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI"
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

// export const initMap = () => {
//   const proxyurl = "https://cors-anywhere.herokuapp.com/";
//   const googleURL = "https://maps.googleapis.com/maps/api/place/details/json?"
//     +"language=en&placeid=ChIJe679Rrl8mQARqtBcHQR1F0o&key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI&callback=initMap";
//   fetch(proxyurl + googleURL)
//   .then(res => {let sup = res.json(); console.log(res.json); return sup})
//   .then(data => {let mapData = data; console.log(data); return mapData})
//   .catch(error => console.log(error))

  // const map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: -34.397, lng: 150.644},
  //   zoom: 8
  // });
//}
