import HttpError from '@wasp/core/HttpError.js'

export const getClonedSites = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.ClonedSite.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}

export const getCloningLogs = async ({ clonedSiteId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const cloningLogs = await context.entities.CloningLog.findMany({
    where: {
      clonedSite: { id: clonedSiteId }
    }
  });

  return cloningLogs;
}