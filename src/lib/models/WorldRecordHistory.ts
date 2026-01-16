import mongoose, { Schema, model, models } from 'mongoose';

export interface IWorldRecordHistory {
  _id: mongoose.Types.ObjectId;
  trackId: mongoose.Types.ObjectId;
  trackSlug: string;
  driverName: string;
  driverSlug: string;
  profileUrl: string;
  recordTime: number;
  recordTimeStr: string;
  kartType?: string;
  dateBroken: Date;
  daysReigned: number;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorldRecordHistorySchema = new Schema<IWorldRecordHistory>(
  {
    trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true, index: true },
    trackSlug: { type: String, required: true, index: true },
    driverName: { type: String, required: true },
    driverSlug: { type: String, required: true },
    profileUrl: { type: String, required: true },
    recordTime: { type: Number, required: true },
    recordTimeStr: { type: String, required: true },
    kartType: { type: String },
    dateBroken: { type: Date, required: true },
    daysReigned: { type: Number, required: true },
    isCurrent: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
    collection: 'worldrecordhistory', // Explicitly set collection name to match Python script
  }
);

// Compound indexes for efficient queries
WorldRecordHistorySchema.index({ trackSlug: 1, kartType: 1, dateBroken: 1 });
WorldRecordHistorySchema.index({ trackSlug: 1, kartType: 1, isCurrent: 1 });

const WorldRecordHistory = models.WorldRecordHistory || model<IWorldRecordHistory>('WorldRecordHistory', WorldRecordHistorySchema);

export default WorldRecordHistory;
