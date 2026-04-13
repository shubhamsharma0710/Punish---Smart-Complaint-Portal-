import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.complaint.create({
      data: {
        title: data.title,
        description: data.description,
        createdById: data.createdById,
      },
    });
  }

  findAll(status?: string) {
    return this.prisma.complaint.findMany({
      where: status ? { status } : {},
      include: {
        createdBy: true,
        reviewer: true,
        comments: true,
      },
    });
  }

  findByUser(userId: number) {
    return this.prisma.complaint.findMany({
      where: { createdById: userId },
    });
  }

  async assignReviewer(id: number, reviewerId: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
    });

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    return this.prisma.complaint.update({
      where: { id },
      data: { reviewerId },
    });
  }

  async markResolved(id: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
    });

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    return this.prisma.complaint.update({
      where: { id },
      data: { status: 'RESOLVED' },
    });
  }

  async delete(id: number, userId: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
    });

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    if (complaint.createdById !== userId) {
      throw new ForbiddenException('Unauthorized');
    }

    return this.prisma.complaint.delete({
      where: { id },
    });
  }
}