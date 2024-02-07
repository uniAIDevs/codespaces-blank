import HttpError from '@wasp/core/HttpError.js'

export const createClonedSite = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.ClonedSite.create({
    data: {
      url: args.url,
      selectedPages: args.selectedPages,
      userId: context.user.id
    }
  });
}

export const updateCloningStatus = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const cloningLog = await context.entities.CloningLog.findUnique({
    where: { id: args.cloningLogId }
  });

  cloningLog.status = args.newStatus;

  return context.entities.CloningLog.update({
    where: { id: args.cloningLogId },
    data: { status: args.newStatus }
  });
}