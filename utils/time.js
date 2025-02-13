function formatDateToWIB(date) {
    let months = [
      "Jan", 
      "Feb", 
      "Mar", 
      "Apr", 
      "Mei", 
      "Jun", 
      "Jul", 
      "Aug", 
      "Sep", 
      "Okt", 
      "Nov", 
      "Des", 
    ];
  
    let day = date.getDate().toString().padStart(2, "0");
    let month = months[date.getMonth()]; // ===>>> bukan nama bulan, bukan angka bulan, tapi index dari bulan tersebut
    let year = date.getFullYear();
  
    let hours = date.getHours().toString().padStart(2, "0"); // ===> "2"
  
    let minutes = date.getMinutes().toString().padStart(2, "0");
  
    let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  
    return formattedDate;
  }
  function getRelativeTime(targetDate) {
    let now = new Date();
    let diffInSeconds = Math.floor((now - targetDate) / 1000); // satuan dari ms ke detik
  
    console.log(diffInSeconds);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    }
  
    let diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }
  }

  module.exports = {
    formatDateToWIB,
    getRelativeTime,
  };