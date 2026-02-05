<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $nombre = htmlspecialchars($_POST['nombre']);
  $email = htmlspecialchars($_POST['email']);
  $telefono = htmlspecialchars($_POST['telefono']);
  $mensaje = htmlspecialchars($_POST['mensaje']);

  $to = "turisticamayama@gmail.com";
  $subject = "Nueva solicitud de cotización - Turística Mayama";

  $body = "Nombre: $nombre\n";
  $body .= "Email: $email\n";
  $body .= "Teléfono: $telefono\n\n";
  $body .= "Mensaje:\n$mensaje";

  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo "<script>alert('Mensaje enviado correctamente.');window.location.href='index.html';</script>";
  } else {
    echo "<script>alert('Error al enviar. Intenta nuevamente.');window.history.back();</script>";
  }
}
?>
