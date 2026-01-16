import mongoose, { Schema, model, models } from 'mongoose';

export interface IWarZone {
  _id: mongoose.Types.ObjectId;
  trackId: mongoose.Types.ObjectId;
  trackSlug: string;
  kartType?: string;
  timeStart: number;
  timeEnd: number;
  driverCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const WarZoneSchema = new Schema<IWarZone>(
  {
    trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true, index: true },
    trackSlug: { type: String, required: true, index: true },
    kartType: { type: String },
    timeStart: { type: Number, required: true },
    timeEnd: { type: Number, required: true },
    driverCount: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'warzones', // Explicitly set collection name to match Python script
  }
);

// Compound unique index for trackSlug + kartType
WarZoneSchema.index({ trackSlug: 1, kartType: 1 }, { unique: true });

const WarZone = models.WarZone || model<IWarZone>('WarZone', WarZoneSchema);

export default WarZone;
