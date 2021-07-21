# Storage Outline

Currently we are using AWS S3 buckets for storage, with separate buckets for different functionalities.

## Structure

We try to have backend-agnostic controllers and services as much as possible, and restrict the storage option specifc code to the `StorageService` adapter.

Currently (April 2021), this service will adapt the cloud storage solution and expose two functions:

- `uploadFile`
- `downloadFile`

Each can also take in a configurable `options` object which may need to modified to suit the specific cloud storage type.

An example can be found with our resume storage, where the `UserController` has no visiblity on what is going on in the back, while the `ResumeService` only has minimal visiblity on the `StorageService`. In this example, we are using AWS S3 buckets, so the `ResumeService` has to specify a named bucket, but it does not see anything beyond that.

If we decide to switch in the future (let's say to Azure), we just need to rewrite the `StorageService` instead of our entire stack.

## Adding new functionality

Adding a new functionality (and therefore a new bucket) would likely involve:

- making a new service which wraps around the basic upload/download functions provided by the `StorageService`

  - Ex: For some graphic storage, add a `GraphicService` which performs the necessary file manipulations and operates on the correct bucket.

- adding the required bucket/container name to the environment file as well as the config file

  - Ex: Add specific bucket name environment variable, then into the config file.

- adding the calls to the higher level service into a controller

  - Ex: Some `GraphicController` can simply call the methods from `GraphicService` without worrying about the details.

- making sure it works
  - you're going to have to learn sometime, so if you are reading this ask for one of the leads to teach you how to configure AWS stuff
  - it may be simpler to ask for access to our cloud resources, and we can generate a key for you so you can test using some custom buckets we create for you.
  - Ex: Get new AWS creds as well as bucket names, which you change in the `.env` file

### LocalStorageService

We made this class for originally for testing purposes, as well as for devs who may want to test on a local filesystem. It should do the exact same thing as `StorageService`, except it will function in a folder on the local machine.
Currently it does not support multiple buckets at once.
**Note: this class may be discontinued in the future if we decide to dedicate a specific environment for testing.**
