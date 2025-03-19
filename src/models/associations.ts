import {
  Role,
  Answer,
  Application,
  ApplicationAnswer,
  Chat,
  Follow,
  Job,
  JobProvider,
  JobQuestion,
  Message,
  Notification,
  Question,
  SavedJob,
  JobSeeker,
  User,
} from "../models";
/* ========= USER & ROLE =========== */
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

/* ========= JOB SEEKER & USER =========== */
User.hasOne(JobSeeker, { foreignKey: "userId" });
JobSeeker.belongsTo(User, { foreignKey: "userId" });

/* ========= JOB PROVIDER & USER =========== */
User.hasOne(JobProvider, { foreignKey: "userId" });
JobProvider.belongsTo(User, { foreignKey: "userId" });

/* ========= JOB & JOB PROVIDER =========== */
JobProvider.hasMany(Job, { foreignKey: "jobProviderId" });
Job.belongsTo(JobProvider, { foreignKey: "jobProviderId" });

/* ========= APPLICATION & USER (JOB SEEKER) =========== */
User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

/* ========= APPLICATION & JOB =========== */
Job.hasMany(Application, { foreignKey: "jobId" });
Application.belongsTo(Job, { foreignKey: "jobId" });

/* ========= SAVED JOBS =========== */
User.hasMany(SavedJob, { foreignKey: "userId" });
SavedJob.belongsTo(User, { foreignKey: "userId" });

Job.hasMany(SavedJob, { foreignKey: "jobId" });
SavedJob.belongsTo(Job, { foreignKey: "jobId" });

/* ========= QUESTIONS (Many-to-Many with Jobs) =========== */
Job.belongsToMany(Question, { through: JobQuestion, foreignKey: "jobId" });
Question.belongsToMany(Job, { through: JobQuestion, foreignKey: "questionId" });

/* ========= ANSWERS =========== */
Answer.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Answer, { foreignKey: "userId" });

Answer.belongsTo(Question, { foreignKey: "questionId" });
Question.hasMany(Answer, { foreignKey: "questionId" });

/* ========= APPLICATION ANSWERS =========== */
Application.belongsToMany(Answer, {
  through: ApplicationAnswer,
  foreignKey: "applicationId",
});
Answer.belongsToMany(Application, {
  through: ApplicationAnswer,
  foreignKey: "answerId",
});

/* ========= CHATS =========== */
Chat.belongsTo(User, { foreignKey: "firstUser" });
Chat.belongsTo(User, { foreignKey: "secondUser" });

User.hasMany(Chat, { as: "chatsAsFirstUser", foreignKey: "firstUser" });
User.hasMany(Chat, { as: "chatsAsSecondUser", foreignKey: "secondUser" });

/* ========= MESSAGES =========== */
Message.belongsTo(Chat, { foreignKey: "chatId" });
Chat.hasMany(Message, { foreignKey: "chatId" });

/* ========= FOLLOWING COMPANIES =========== */
Follow.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Follow, { foreignKey: "userId" });

/* ========= NOTIFICATIONS =========== */
Notification.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Notification, { foreignKey: "userId" });

Notification.belongsTo(User, { foreignKey: "from" });
User.hasMany(Notification, { foreignKey: "from" });

export default function initAssociations() {
  console.log("Associations initialized");
}
