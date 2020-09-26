const type = document.getElementById("typeId");
const link = document.getElementById("link");
const allFomrats = document.getElementById("allFormats");
const options = document.querySelectorAll(".options");
const option = [...options];
function myFunction() {
  getInfo(link.value);
  if (option[0].selected === true) {
    //getInfo(link.value);
  } else if (option[1].selected === true) {
    downloadMP3(link.value);
  }
}

const downloadMP3 = (url) => {
  const userURL = `${window.location.href}downloadmp3?url=${url}`;
  console.log(userURL);
  fetch(userURL).then((res) => {
    if (res.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("download", "");
      downloadLink.href = userURL;
      downloadLink.click();
    } else if (res.status === 400) {
      alert("invalid URL");
    }
  });
};

const downloadMP4 = (url) => {
  const userURL = `${window.location.href}downloadmp4?url=${url}`;
  console.log(userURL);
  fetch(userURL).then((res) => {
    if (res.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("download", "");
      downloadLink.href = userURL;
      downloadLink.click();
    } else if (res.status === 400) {
      alert("invalid URL");
    }
  });
};

const getInfo = (url) => {
  const userURL = `${window.location.href}onlyinfo?url=${url}`;
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  fetch(userURL)
    .then((res) => {
      if (res.status === 200) {
        loader.style.display = "none";
        res.json().then((body) => {
          console.log(body);
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
            rowItem3.innerHTML = `<a class="btn btn-outline-primary btn-block" download href="${downloadURL}">Download</a>`;
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
