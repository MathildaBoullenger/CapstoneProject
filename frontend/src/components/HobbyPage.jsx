import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import AddActivityForm from "./AddActivityForm"

const HobbyPage = () => {
  const { name } = useParams();

  // Sample data for the forum
  const forumData = [
    { id: 1, title: "Activity 1", content: "Lorem ipsum dolor sit amet." },
    { id: 2, title: "Activity 2", content: "Lorem ipsum dolor sit amet." },
    { id: 3, title: "Activity 3", content: "Lorem ipsum dolor sit amet." },
  ];

  const handleJoinActivity = (discussionId) => {
    // Handle the join action for the specific discussion
    console.log("Join Activity:", discussionId);
  };

  const handleCreateActivity = () => {
    // Handle the create activity action
    console.log("Create Activity");
  };

  return (
    <div>
      <h2>coLab Space - {name}</h2>
      
      {/* Render the specific content for the hobby page */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            What's on?
          </Typography>
          {forumData.map((discussion) => (
            <Card key={discussion.id} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {discussion.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {discussion.content}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinActivity(discussion.id)}
                >
                  Join
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateActivity}
      >
        Create Activity
      </Button>
    </div>
  );
};

export default HobbyPage;
