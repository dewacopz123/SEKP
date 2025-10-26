function openModal() {
  document.getElementById('photoModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('photoModal').style.display = 'none';
}

function previewImageFile(event) {
  const reader = new FileReader();
  reader.onload = function() {
    document.getElementById('previewImage').src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const response = await fetch('../../Views/Profiles/upload.php', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (result.success) {
  document.getElementById('previewImage').src = result.filePath + '?v=' + new Date().getTime();

  document.querySelector('.photo').src = result.filePath + '?v=' + new Date().getTime();

  closeModal();
  alert('Foto profil berhasil diperbarui!');
}

});
