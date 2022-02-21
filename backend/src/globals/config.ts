const environment_prod = {
    production: true,
    uploads: "https://ai-lab-backend.herokuapp.com/",
    backend: "https://ai-lab-backend.herokuapp.com/",
    frontend: "https://ai-lab-frontend.herokuapp.com/",
    bundleJs : "https://ai-lab-frontend.herokuapp.com/assets/mybot/js/bundle.js",
};
const environment_dev = {
    production: false,
    uploads : "http://localhost:3000/",
    backend : "http://localhost:3000/",
    frontend : "http://localhost:4200/",
    bundleJs : "http://localhost:4200/assets/mybot/js/bundle.js",
  };

export const config = {
    // ...environment_prod,
    ...environment_dev
}
