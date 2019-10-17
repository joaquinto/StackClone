export const addToSet = async (model, id, condition, payload) => {
  try {
    const data = await model.findOne({ _id: id });
    data[condition].addToSet(payload);
    data.save();
    return data;
  } catch (error) {
    return new Error(error);
  }
};

export const voteQuestion = async (model, id, condition) => {
  try {
    const data = (condition === 'upvote') ? await model.findOneAndUpdate({ _id: id }, { $inc: { votes: 1 } }, { new: true }) : await model.findOneAndUpdate({ _id: id }, { $inc: { votes: -1 } }, { new: true });
    return data;
  } catch (error) {
    return new Error(error);
  }
};

export const clearDb = async (model) => {
  try {
    console.log('Data deleting ...');
    return await model.deleteMany({});
  } catch (error) {
    return new Error(error);
  }
};
