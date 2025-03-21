
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";
import { cn } from "@/lib/utils";

// Kendo UI imports
import { Chat } from "@progress/kendo-react-conversational-ui";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { Card, CardTitle, CardBody, CardActions } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { 
  Field, 
  Form, 
  FormElement, 
  FormRenderProps 
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Switch } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Avatar } from "@progress/kendo-react-layout";

// Sample data
const chatMessages = [
  {
    author: { id: 1, name: "AI Assistant", avatarUrl: "https://via.placeholder.com/30" },
    timestamp: new Date(),
    text: "Hello! How can I help you with your fitness goals today?",
  },
  {
    author: { id: 2, name: "User", avatarUrl: "https://via.placeholder.com/30" },
    timestamp: new Date(),
    text: "I'm looking for a good cardio workout.",
  },
];

const tabData = ["Dashboard", "Workouts", "Nutrition", "Progress"];

const chartData = [
  { category: "Mon", value: 30 },
  { category: "Tue", value: 45 },
  { category: "Wed", value: 25 },
  { category: "Thu", value: 60 },
  { category: "Fri", value: 40 },
  { category: "Sat", value: 50 },
  { category: "Sun", value: 35 },
];

const gridData = [
  { id: 1, workout: "Running", duration: "30 min", calories: 320 },
  { id: 2, workout: "Weightlifting", duration: "45 min", calories: 280 },
  { id: 3, workout: "Yoga", duration: "60 min", calories: 200 },
  { id: 4, workout: "Swimming", duration: "40 min", calories: 350 },
  { id: 5, workout: "Cycling", duration: "50 min", calories: 400 },
];

const dropdownData = ["Beginner", "Intermediate", "Advanced", "Expert"];

const KendoComponentsDemo = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    level: "Beginner",
  });
  
  // Chat handlers
  const addNewMessage = (event: any) => {
    console.log("New message:", event.message);
  };

  // Form handlers
  const handleFormSubmit = (dataItem: any) => {
    setFormValues(dataItem);
    alert("Form submitted: " + JSON.stringify(dataItem, null, 2));
  };

  return (
    <AnimatedTransition className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Kendo UI React Components Demo</h1>
        
        <div className="grid grid-cols-1 gap-8">
          {/* TabStrip Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">TabStrip Component</h2>
            <TabStrip
              selected={selectedTab}
              onSelect={(e) => setSelectedTab(e.selected)}
              className="mb-4"
            >
              {tabData.map((tab, index) => (
                <TabStripTab key={index} title={tab}>
                  <div className="p-4">
                    <h3 className="font-medium">{tab} Content</h3>
                    <p className="text-muted-foreground">
                      This is the content for the {tab.toLowerCase()} tab.
                    </p>
                  </div>
                </TabStripTab>
              ))}
            </TabStrip>
          </section>

          {/* Card Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Card Component</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardTitle>Workout Plan</CardTitle>
                <CardBody>
                  <p>This is a sample workout plan using Kendo UI Card component.</p>
                </CardBody>
                <CardActions>
                  <Button themeColor="primary">View Details</Button>
                </CardActions>
              </Card>
              
              <Card>
                <CardTitle>Nutrition Advice</CardTitle>
                <CardBody>
                  <p>This is a sample nutrition advice using Kendo UI Card component.</p>
                </CardBody>
                <CardActions>
                  <Button themeColor="primary">View Details</Button>
                </CardActions>
              </Card>
            </div>
          </section>

          {/* Button Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Button Component</h2>
            <div className="flex flex-wrap gap-4">
              <Button themeColor="primary">Primary Button</Button>
              <Button>Default Button</Button>
              <Button disabled={true}>Disabled Button</Button>
              <Button icon="user">Icon Button</Button>
              <Button fillMode="outline">Outline Button</Button>
            </div>
          </section>

          {/* Drawer Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Drawer Component</h2>
            <Button onClick={() => setDrawerExpanded(true)}>Open Drawer</Button>
            
            <Drawer
              expanded={drawerExpanded}
              position="start"
              mode="overlay"
              onOverlayClick={() => setDrawerExpanded(false)}
            >
              <DrawerContent>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">FitAI Menu</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-primary">Dashboard</a></li>
                    <li><a href="#" className="text-muted-foreground">Workouts</a></li>
                    <li><a href="#" className="text-muted-foreground">Nutrition</a></li>
                    <li><a href="#" className="text-muted-foreground">Progress</a></li>
                    <li><a href="#" className="text-muted-foreground">Settings</a></li>
                  </ul>
                  <Button className="mt-4" onClick={() => setDrawerExpanded(false)}>Close</Button>
                </div>
              </DrawerContent>
            </Drawer>
          </section>

          {/* Form Components */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Form Components</h2>
            <Form
              onSubmit={handleFormSubmit}
              initialValues={formValues}
              render={(formRenderProps: FormRenderProps) => (
                <FormElement>
                  <div className="mb-4">
                    <Field
                      id="name"
                      name="name"
                      label="Name"
                      component={Input}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Field
                      id="level"
                      name="level"
                      label="Fitness Level"
                      component={DropDownList}
                      data={dropdownData}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      themeColor="primary"
                      type="submit"
                      disabled={!formRenderProps.allowSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </FormElement>
              )}
            />
          </section>

          {/* Chart Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Chart Component</h2>
            <Chart style={{ height: 300 }}>
              <ChartTitle text="Weekly Workout Duration (minutes)" />
              <ChartLegend position="bottom" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={chartData.map(item => item.category)} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="column"
                  data={chartData.map(item => item.value)}
                  color="#4338ca"
                />
              </ChartSeries>
            </Chart>
          </section>

          {/* ProgressBar Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">ProgressBar Component</h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2">Weekly Goal Progress (70%)</p>
                <ProgressBar value={70} />
              </div>
              <div>
                <p className="mb-2">Monthly Goal Progress (45%)</p>
                <ProgressBar value={45} />
              </div>
              <div>
                <p className="mb-2">Yearly Goal Progress (25%)</p>
                <ProgressBar value={25} />
              </div>
            </div>
          </section>

          {/* Grid Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Grid Component</h2>
            <Grid data={gridData} style={{ height: "300px" }}>
              <GridColumn field="id" title="ID" width="60px" />
              <GridColumn field="workout" title="Workout" />
              <GridColumn field="duration" title="Duration" />
              <GridColumn field="calories" title="Calories Burned" />
            </Grid>
          </section>

          {/* Switch Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Switch Component</h2>
            <div className="flex items-center gap-2">
              <Switch
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.value)}
              />
              <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
          </section>

          {/* Dialog Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Dialog Component</h2>
            <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            
            {dialogOpen && (
              <Dialog title="Workout Completed!" onClose={() => setDialogOpen(false)}>
                <p>Congratulations! You've completed your workout for today.</p>
                <p>Would you like to share your achievement?</p>
                <DialogActionsBar>
                  <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button themeColor="primary" onClick={() => setDialogOpen(false)}>Share</Button>
                </DialogActionsBar>
              </Dialog>
            )}
          </section>

          {/* Tooltip Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tooltip Component</h2>
            <div className="flex items-center gap-4">
              <Tooltip anchorElement="target" position="top">
                <Button title="Click to view your workout history">Workout History</Button>
              </Tooltip>
              
              <Tooltip anchorElement="target" position="right">
                <Button title="Click to view your nutritional information">Nutrition Info</Button>
              </Tooltip>
            </div>
          </section>

          {/* Avatar Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Avatar Component</h2>
            <div className="flex gap-4">
              <Avatar type="image">
                <img src="https://via.placeholder.com/50" alt="User" />
              </Avatar>
              
              <Avatar type="text" size="large">
                JD
              </Avatar>
              
              <Avatar type="icon" size="large">
                <span className="k-icon k-i-user"></span>
              </Avatar>
            </div>
          </section>

          {/* Chat Component */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Chat Component</h2>
            <div style={{ height: "400px" }}>
              <Chat
                messages={chatMessages}
                user={{ id: 2, name: "User" }}
                onMessageSend={addNewMessage}
                placeholder="Type your fitness question..."
              />
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default KendoComponentsDemo;
