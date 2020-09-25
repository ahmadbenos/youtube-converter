const type = document.getElementById("typeId");
const link = document.getElementById("link");
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
  fetch(userURL)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((body) => console.log(body));
      } else if (res.status === 400) {
        alert("Invalid Url");
      }
    })
    .catch((err) => console.log(err));
};
