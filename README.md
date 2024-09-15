# Clinic System Vue

This project is a frontend for an application designed to manage a
small medical clinic. It is built using Vue and Vuetify.
The project can be run locally or deployed to a Kubernetes cluster.
The system can be used as a frontend for the following backend project: [Clinic System](https://github.com/marekkawalski/clinic-system).

## Table of Contents

<!-- TOC -->
* [Clinic System Vue](#clinic-system-vue)
    * [Table of Contents](#table-of-contents)
    * [Running project locally](#running-project-locally)
        * [Prerequisites](#prerequisites)
        * [Setup](#setup)
        * [Running the Project](#running-the-project)
    * [Deployment to Kubernetes](#deployment-to-kubernetes)
        * [Prerequisites](#prerequisites-1)
        * [Setup](#setup-1)
        * [Running the Project](#running-the-project-1)
<!-- TOC -->

Clone the repository and navigate to the project directory

```bash
git clone https://github.com/marekkawalski/clinic-system-vue.git && cd clinic-system-vue
```

## Running project locally

### Prerequisites

- Node.js 20.x or higher
- npm

### Setup

1. Install the dependencies

```bash
npm i
```

### Running the Project
1. Run the following command to start the application:
```bash
npm start
```
2. Open the browser and navigate to `http://localhost:3000/`
3. The application should be running

## Deployment to Kubernetes

### Prerequisites
- Docker deamon, example: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Kubernetes cluster, example: [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- kubectl

### Setup
1. Add Vue app host to the hosts file
```bash
sudo echo '127.0.0.1       vue.clinic.system.com'
>> ~/etc/hosts
```

2. Run the following command to build the Docker image:
```bash
docker build . -t clinic-system-vue:0.0.3
```

3. Run the following command to deploy the application to Kubernetes:
```bash
kubectl apply -f k8s/deployment.yaml
```
### Running the Project
1. Open the browser and navigate to http://vue.clinic.system.com/
2. The application should be running