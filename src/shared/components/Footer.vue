<template>
  <div class="footer">
    <h2>Contact Us</h2>
    <p>
      If you have any questions or need help, feel free to contact us. We are
      always ready to help you.
    </p>
    <div class="container">
      <img
        alt="line"
        class="line doctor-img"
        height="4812"
        src="@/assets/images/medical-doctor.webp"
        width="2863"
      />
      <div class="contact-info">
        <div class="contact-info-item">
          <v-icon>mdi-map-marker</v-icon>
          <h3>Address</h3>
          <p>Wijttenbachstraat 36</p>
          <p>1093 JC Amsterdam</p>
        </div>
        <div class="contact-info-item">
          <v-icon>mdi-phone</v-icon>
          <h3>Phones</h3>
          <p>020 665 63 33</p>
          <p>020 665 63 32</p>
        </div>
        <div class="contact-info-item">
          <v-icon>mdi-email</v-icon>
          <h3>Email</h3>
          <p>clinic&#64;clinic-system.com</p>
        </div>
        <div class="contact-info-item">
          <v-icon>mdi-calendar-clock</v-icon>
          <h3>Opening hours</h3>
          <p>Monday - Friday: 09:00 - 17:00</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
        <div class="contact-info-item">
          <v-icon>mdi-account-plus</v-icon>
          <h3>Follow us</h3>
          <p>
            Join us on social media to stay up to date with our latest news and
            events.
          </p>
          <div class="social-media">
            <a href="https://www.facebook.com" target="_blank">Facebook</a>
            <a href="https://www.instagram.com" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com" target="_blank">Linkedin</a>
            <a href="https://www.twitter.com" target="_blank">Twitter</a>
          </div>
        </div>
      </div>
    </div>
    <div class="page-info">
      <p>
        <strong>Disclaimer:</strong> This website is for educational purposes
        only. It is not intended to provide medical advice or to take the place
        of medical advice or treatment from a personal physician. All
        readers/viewers of this content are advised to consult their doctors or
        qualified health professionals regarding specific health questions.
        Clinic System does not take responsibility for possible health
        consequences of any person or persons reading or following the
        information in this educational content. All viewers of this content,
        especially those taking prescription or over-the-counter medications,
        should consult their physicians before beginning any nutrition,
        supplement or lifestyle program.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped>
.footer {
  background-color: rgb(var(--v-theme-secondary));
  color: white;
  padding: 1em;
  text-align: center;

  h2 {
    font-size: 2rem;
    text-align: center;
    padding-bottom: 2em;
    padding-top: 1em;
  }

  h5 {
    font-size: 1.2rem;
    padding-bottom: 1em;
    padding-top: 0.4em;
  }

  .page-info {
    padding: 4em 2em 2em 2em;
  }

  .container {
    margin-top: 2em;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 2em;

      .contact-info-item {
        display: block;
        min-width: fit-content;
        padding: 1.5em;
        background-color: gray;
        border-radius: 8px;
      }

      .social-media {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 1em;
        gap: 0.5em;

        a {
          color: white;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .doctor-img {
      width: auto;
      height: 600px;
    }
  }
}
</style>
