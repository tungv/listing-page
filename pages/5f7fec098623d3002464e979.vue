<template>
  <div class="container">5f7fec098623d3002464e979</div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          hid: "facebook",
          src:
            "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0&appId=1177682459073267&autoLogAppEvents=1",
          defer: true,
          async: true,
          nonce: "36uC68Zf",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "aaaaaaaaaaaaaaaaaaaaaaaa",
        },
        {
          hid: "image",
          name: "image",
          content: "https://unsplash.com/photos/RaRARO4gQcU",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.container_postDetail {
  display: flex;
  flex-direction: column;
}
.container_postDetail {
  // flex-direction: column;
  .commentSection {
    display: none;
  }
  .postDetail {
  }
  @media screen and (min-width: $breakpoint-tablet) {
    flex-direction: row;
  }
}
</style>
