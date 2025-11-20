import { pgTable, text, timestamp, integer, boolean, decimal, pgEnum, uuid, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['freelancer', 'client', 'admin']);
export const jobStatusEnum = pgEnum('job_status', ['open', 'in_progress', 'completed', 'cancelled']);
export const proposalStatusEnum = pgEnum('proposal_status', ['pending', 'accepted', 'rejected', 'withdrawn']);
export const contractStatusEnum = pgEnum('contract_status', ['active', 'completed', 'cancelled', 'disputed']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'escrowed', 'released', 'refunded']);
export const notificationTypeEnum = pgEnum('notification_type', ['message', 'proposal', 'job', 'payment', 'review', 'system']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified'),
  password: text('password').notNull(),
  name: text('name').notNull(),
  image: text('image'),
  role: userRoleEnum('role').notNull().default('client'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
}));

// Categories Table
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Skills Table
export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  categoryId: uuid('category_id').references(() => categories.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  categoryIdx: index('skill_category_idx').on(table.categoryId),
}));

// Freelancer Profiles Table
export const freelancerProfiles = pgTable('freelancer_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  title: text('title').notNull(),
  bio: text('bio'),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  availability: text('availability'),
  location: text('location'),
  website: text('website'),
  github: text('github'),
  linkedin: text('linkedin'),
  totalEarnings: decimal('total_earnings', { precision: 12, scale: 2 }).default('0'),
  completedJobs: integer('completed_jobs').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: uniqueIndex('freelancer_user_idx').on(table.userId),
}));

// Freelancer Skills Junction Table
export const freelancerSkills = pgTable('freelancer_skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  freelancerId: uuid('freelancer_id').references(() => freelancerProfiles.id, { onDelete: 'cascade' }).notNull(),
  skillId: uuid('skill_id').references(() => skills.id, { onDelete: 'cascade' }).notNull(),
  yearsOfExperience: integer('years_of_experience').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  freelancerSkillIdx: index('freelancer_skill_idx').on(table.freelancerId, table.skillId),
}));

// Portfolio Items Table
export const portfolioItems = pgTable('portfolio_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  freelancerId: uuid('freelancer_id').references(() => freelancerProfiles.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url'),
  imageUrl: text('image_url'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  freelancerIdx: index('portfolio_freelancer_idx').on(table.freelancerId),
}));

// Client Profiles Table
export const clientProfiles = pgTable('client_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  companyName: text('company_name'),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  totalSpent: decimal('total_spent', { precision: 12, scale: 2 }).default('0'),
  postedJobs: integer('posted_jobs').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: uniqueIndex('client_user_idx').on(table.userId),
}));

// Jobs Table
export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').references(() => clientProfiles.id, { onDelete: 'cascade' }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  budget: decimal('budget', { precision: 12, scale: 2 }),
  budgetType: text('budget_type').notNull(), // 'fixed' or 'hourly'
  status: jobStatusEnum('status').notNull().default('open'),
  location: text('location'),
  remote: boolean('remote').default(false),
  experienceLevel: text('experience_level'), // 'entry', 'intermediate', 'expert'
  duration: text('duration'), // 'short', 'medium', 'long'
  proposalCount: integer('proposal_count').default(0),
  viewCount: integer('view_count').default(0),
  postedAt: timestamp('posted_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  clientIdx: index('job_client_idx').on(table.clientId),
  categoryIdx: index('job_category_idx').on(table.categoryId),
  statusIdx: index('job_status_idx').on(table.status),
}));

// Job Skills Junction Table
export const jobSkills = pgTable('job_skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  skillId: uuid('skill_id').references(() => skills.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  jobSkillIdx: index('job_skill_idx').on(table.jobId, table.skillId),
}));

// Proposals Table
export const proposals = pgTable('proposals', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  freelancerId: uuid('freelancer_id').references(() => freelancerProfiles.id, { onDelete: 'cascade' }).notNull(),
  coverLetter: text('cover_letter').notNull(),
  proposedRate: decimal('proposed_rate', { precision: 10, scale: 2 }).notNull(),
  estimatedDuration: text('estimated_duration'),
  status: proposalStatusEnum('status').notNull().default('pending'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  jobIdx: index('proposal_job_idx').on(table.jobId),
  freelancerIdx: index('proposal_freelancer_idx').on(table.freelancerId),
  statusIdx: index('proposal_status_idx').on(table.status),
}));

// Contracts Table
export const contracts = pgTable('contracts', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  proposalId: uuid('proposal_id').references(() => proposals.id, { onDelete: 'cascade' }).notNull(),
  clientId: uuid('client_id').references(() => clientProfiles.id, { onDelete: 'cascade' }).notNull(),
  freelancerId: uuid('freelancer_id').references(() => freelancerProfiles.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  status: contractStatusEnum('status').notNull().default('active'),
  startDate: timestamp('start_date').defaultNow().notNull(),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  jobIdx: index('contract_job_idx').on(table.jobId),
  clientIdx: index('contract_client_idx').on(table.clientId),
  freelancerIdx: index('contract_freelancer_idx').on(table.freelancerId),
  statusIdx: index('contract_status_idx').on(table.status),
}));

// Messages Table
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  receiverId: uuid('receiver_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  senderIdx: index('message_sender_idx').on(table.senderId),
  receiverIdx: index('message_receiver_idx').on(table.receiverId),
  createdAtIdx: index('message_created_at_idx').on(table.createdAt),
}));

// Reviews Table
export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  contractId: uuid('contract_id').references(() => contracts.id, { onDelete: 'cascade' }).notNull(),
  reviewerId: uuid('reviewer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  revieweeId: uuid('reviewee_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  contractIdx: index('review_contract_idx').on(table.contractId),
  revieweeIdx: index('review_reviewee_idx').on(table.revieweeId),
}));

// Payments Table
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  contractId: uuid('contract_id').references(() => contracts.id, { onDelete: 'cascade' }).notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  status: paymentStatusEnum('status').notNull().default('pending'),
  payerId: uuid('payer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  payeeId: uuid('payee_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  transactionId: text('transaction_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  contractIdx: index('payment_contract_idx').on(table.contractId),
  statusIdx: index('payment_status_idx').on(table.status),
}));

// Notifications Table
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: notificationTypeEnum('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  link: text('link'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('notification_user_idx').on(table.userId),
  readIdx: index('notification_read_idx').on(table.read),
}));

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  freelancerProfile: one(freelancerProfiles, {
    fields: [users.id],
    references: [freelancerProfiles.userId],
  }),
  clientProfile: one(clientProfiles, {
    fields: [users.id],
    references: [clientProfiles.userId],
  }),
}));

export const freelancerProfilesRelations = relations(freelancerProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [freelancerProfiles.userId],
    references: [users.id],
  }),
  skills: many(freelancerSkills),
  portfolio: many(portfolioItems),
  proposals: many(proposals),
}));

export const clientProfilesRelations = relations(clientProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [clientProfiles.userId],
    references: [users.id],
  }),
  jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  client: one(clientProfiles, {
    fields: [jobs.clientId],
    references: [clientProfiles.id],
  }),
  category: one(categories, {
    fields: [jobs.categoryId],
    references: [categories.id],
  }),
  skills: many(jobSkills),
  proposals: many(proposals),
}));

export const proposalsRelations = relations(proposals, ({ one }) => ({
  job: one(jobs, {
    fields: [proposals.jobId],
    references: [jobs.id],
  }),
  freelancer: one(freelancerProfiles, {
    fields: [proposals.freelancerId],
    references: [freelancerProfiles.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  category: one(categories, {
    fields: [skills.categoryId],
    references: [categories.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type FreelancerProfile = typeof freelancerProfiles.$inferSelect;
export type NewFreelancerProfile = typeof freelancerProfiles.$inferInsert;
export type ClientProfile = typeof clientProfiles.$inferSelect;
export type NewClientProfile = typeof clientProfiles.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Proposal = typeof proposals.$inferSelect;
export type NewProposal = typeof proposals.$inferInsert;
export type Contract = typeof contracts.$inferSelect;
export type NewContract = typeof contracts.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;
