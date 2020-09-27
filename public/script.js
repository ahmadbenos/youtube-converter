const type = document.getElementById("typeId");
const link = document.getElementById("link");
const allFomrats = document.getElementById("allFormats");
const tableHead = document.getElementById("table-head");
const downloadAlert = document.getElementById("download-alert");
const options = document.querySelectorAll(".options");
const option = [...options];
function myFunction() {
  if (option[0].selected === true) {
    getMp4Info(link.value);
  } else if (option[1].selected === true) {
    getMp3Info(link.value);
  }
}

//! MP4 functionality
const getMp4Info = (url) => {
  const userURL = `${window.location.href}getvideo?url=${url}`;
  let loader = document.getElementById("loader");
  loader.style.display = "block"; // display the loader
  allFomrats.innerHTML = ""; // remove the table head
  tableHead.innerHTML = ""; // remove the table content
  document.getElementById("thumbnail").src = ""; // remove the image
  document.getElementById("title").innerText = ""; // remove the vid title
  downloadAlert.innerHTML = ""; // remove download alert if displayed before

  // get data from server
  fetch(userURL)
    .then((res) => {
      if (res.status === 200) {
        loader.style.display = "none"; // info loaded = hide the loading animation
        res.json().then((body) => {
          // console.log(body);
          document.getElementById("thumbnail").src = body[1];
          document.getElementById("title").innerText = body[2];
          const tableHead = document.getElementById("table-head");
          tableHead.innerHTML = `<tr>
          <th scope="col">Quality</th>
          <th scope="col">Size</th>
      </tr>`;
          allFomrats.innerHTML = "";
          body[0].forEach((item) => {
            const row = document.createElement("tr");
            const rowItem1 = document.createElement("td");
            rowItem1.innerText = item.quality + "p";
            rowItem1.classList.add("text-center");
            rowItem1.style.fontSize = "20px";
            row.appendChild(rowItem1);

            // convert from bytes to MB(binary)
            let size;
            if (item.size !== null) {
              let kb = item.size / 1024;
              let mb = kb / 1024;
              size = mb.toFixed(2) + " MB";
            }

            const rowItem2 = document.createElement("td");
            rowItem2.innerText = item.size === null ? "unknown" : size;
            rowItem2.classList.add("text-center");
            rowItem2.style.fontSize = "19px";
            row.appendChild(rowItem2);

            const rowItem3 = document.createElement("td");
            const downloadURL = `${window.location.href}downloadmp4?url=${url}&itag=${item.itag}&size=${item.size}`;
            // add download attribute to the <a> tag to download the response's writedStream
            rowItem3.innerHTML = `<a class="btn btn-outline-primary btn-block" download href="${downloadURL}">Download</a>`;
            row.appendChild(rowItem3);

            // append all rows to the table
            allFomrats.appendChild(row);
          });
        });
        // if the URL is invalid
      } else if (res.status === 400) {
        loader.style.display = "none";
        alert("Invalid Url");
      }
    })
    .catch((err) => console.log(err));
};

//! MP3 functionality
const getMp3Info = (url) => {
  const userURL = `${window.location.href}getaudio?url=${url}`;
  let loader = document.getElementById("loader");
  loader.style.display = "block"; // show loading animation
  allFomrats.innerHTML = ""; // remove table content
  tableHead.innerHTML = ""; // remove table head
  document.getElementById("thumbnail").src = ""; // remove thumbnail
  document.getElementById("title").innerText = ""; // remove vid title
  downloadAlert.innerHTML = ""; // remove download alert if displayed before

  // get data from server
  fetch(userURL)
    .then((res) => {
      if (res.status === 200) {
        loader.style.display = "none";

        res.json().then((body) => {
          //console.log(body);
          document.getElementById("thumbnail").src = body[1];
          document.getElementById("title").innerText = body[2];

          tableHead.innerHTML = `<tr>
          <th scope="col">Quality</th>
          <th scope="col">Size</th>
      </tr>`;
          allFomrats.innerHTML = "";
          body[0].forEach((item) => {
            const row = document.createElement("tr");
            const rowItem1 = document.createElement("td");
            rowItem1.innerText = item.quality;
            rowItem1.classList.add("text-center");
            rowItem1.style.fontSize = "20px";
            row.appendChild(rowItem1);

            let size;
            if (item.size !== null) {
              let kb = item.size / 1024;
              let mb = kb / 1024;
              size = mb.toFixed(2) + " MB";
            }

            const rowItem2 = document.createElement("td");
            rowItem2.innerText = item.size === null ? "unknown" : size;
            rowItem2.classList.add("text-center");
            rowItem2.style.fontSize = "19px";
            row.appendChild(rowItem2);

            const rowItem3 = document.createElement("td");
            const downloadURL = `${window.location.href}downloadmp3?url=${url}&itag=${item.itag}&size=${item.size}`;
            // add download attribute to the <a> tag to download the response's writedStream
            rowItem3.innerHTML = `<a class="btn btn-outline-primary btn-block" download href="${downloadURL}" onclick="msg()">Download</a>`;
            row.appendChild(rowItem3);

            allFomrats.appendChild(row);
          });
        });
      } else if (res.status === 400) {
        loader.style.display = "none";
        alert("Invalid Url");
      }
    })
    .catch((err) => console.log(err));
};

function msg() {
  downloadAlert.innerHTML = "";
  downloadAlert.innerHTML = `<div class="alert alert-primary alert-dismissible fade show my-1" id="download-alert"
  role="alert">
  <strong>Your download will start in a few seconds!</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
  </button>
</div>`;
}
