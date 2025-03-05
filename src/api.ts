import { Application } from "./types";
const STORAGE_PREFIX = "alt-shift-";

export const api = {
  getApplicationIdsList: () => {
    const unparsedApplicationIds = localStorage.getItem(
      `${STORAGE_PREFIX}-application-ids`,
    );
    return unparsedApplicationIds
      ? (JSON.parse(unparsedApplicationIds) as string[])
      : [];
  },

  retainApplication: async (application: Application) => {
    localStorage.setItem(
      `${STORAGE_PREFIX}-application-${application.id}`,
      JSON.stringify(application),
    );
    localStorage.setItem(
      `${STORAGE_PREFIX}-application-ids`,
      JSON.stringify([
        ...new Set([...api.getApplicationIdsList(), application.id]),
      ]),
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(application);
      }, 3000);
    });
  },

  deleteApplication: async (applicationId: string) => {
    localStorage.setItem(
      `${STORAGE_PREFIX}-application-ids`,
      JSON.stringify(
        api
          .getApplicationIdsList()
          .filter((id: string) => id !== applicationId),
      ),
    );
    localStorage.removeItem(`${STORAGE_PREFIX}-application-${applicationId}`);
  },

  getApplication: async (applicationId: Application["id"]) => {
    const unparsedApplication = localStorage.getItem(
      `${STORAGE_PREFIX}-application-${applicationId}`,
    );
    return Promise.resolve(
      unparsedApplication
        ? (JSON.parse(unparsedApplication) as Application)
        : null,
    );
  },

  getApplications: async () => {
    const applications = await Promise.all(
      api.getApplicationIdsList().map((id: string) => {
        return api.getApplication(id);
      }),
    );
    return applications.filter((application) => application !== null);
  },
};
