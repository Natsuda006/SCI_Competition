import Activity from "../models/activity.models";
const activityControllers = {};
// Create a new activity
activityControllers.createActivity = async (req, res) => {
    try {
        const {
            name,
            description,    
            type,
            level,
            team_size,  
            date,
            location,
            reg_open,
            reg_close,
            contact_name,
            contact_phone,
            contact_email,
            status
        } = req.body;
        // Validate required fields
        if (!name || !description || !type || !level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email) {
            return res.status(400).json({ message: "All fields are required." });
        }
        await Activity.findone({ where: { name: name } }).then(async activity => {
            if (activity) {
                res.status(400).send({ message: "Activity name already exists!" });
                return;
            }
        });
        // Create the activity
        const newActivity = await Activity.create({
            name,
            description,
            type,
            level,
            team_size,  
            date,   
            location,
            reg_open,
            reg_close,
            contact_name,
            contact_phone,
            contact_email,
            status: status || 'draft' // Default status to 'draft' if not provided
        });
        res.status(201).json(newActivity);
    }
    catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ message: "Internal server error." });
    }   
};
// Get all activities
activityControllers.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    }
    catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
// Get activity by ID
activityControllers.getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }
        res.status(200).json(activity);
    }
    catch (error) {
        console.error("Error fetching activity:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
// Update activity by ID
activityControllers.updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
         if (!id){
            return res.status(400).json({ message: "Activity ID is required." });
            
        }
        const {
            name,
            description,
            type,
            level,
            team_size,
            num,
            date,
            location,
            reg_open,
            reg_close,
            contact_name,
            contact_phone,
            contact_email,
            status
        } = req.body;
        if (!name || !description || !type || !level || !team_size || !num || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }
        await activity.update({
            name: name || activity.name,
            description: description || activity.description,
            type: type || activity.type,
            level: level || activity.level,
            team_size: team_size || activity.team_size,
            num: num || activity.num,
            date: date || activity.date,
            location: location || activity.location,
            reg_open: reg_open || activity.reg_open,
            reg_close: reg_close || activity.reg_close,
            contact_name: contact_name || activity.contact_name,
            contact_phone: contact_phone || activity.contact_phone,
            contact_email: contact_email || activity.contact_email,
            status: status || activity.status
        });
        res.status(200).json(activity);
    }
    catch (error) {
        console.error("Error updating activity:", error);
        res.status(500).json({ message: "Internal server error." });
    }

};


// Delete activity by ID
activityControllers.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }
        await activity.destroy();
        res.status(200).json({ message: "Activity deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting activity:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

activityControllers.serchActivities = async (req, res) => {
    try {
        const { name, type, level, status } = req.query;
        const whereClause = {};
        if (name) {
            whereClause.name = {[Op.like]: `%${name}%`};
        }
        if (type) {
            whereClause.type = type;
        }
        if (level) {
            whereClause.level = level;
        }
        if (status) {
            whereClause.status = status;
        }
        const activities = await Activity.findAll({ where: whereClause });
        res.status(200).json(activities);
    }
    catch (error) {
        console.error("Error searching activities:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export default activityControllers;