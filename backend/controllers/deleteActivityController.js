const { ActivitiesModel } = require('../models');

const deleteActivity = async (req, res) => {
  const { activity_id } = req.params;

  try {
    // Find the activity by its ID
    const activity = await ActivitiesModel.findByPk(activity_id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Delete the activity
    await activity.destroy();

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Failed to delete activity. Please try again.' });
  }
};

module.exports = {
  deleteActivity,
};
