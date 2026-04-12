import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  // ✅ Create comment
  async create(data: any) {
    return this.prisma.comment.create({
      data: {
        message: data.message,
        complaintId: data.complaintId,
        userId: data.userId,
      },
    });
  }

  // ✅ Get comments by complaint
  async getByComplaint(complaintId: number) {
    const comments = await this.prisma.comment.findMany({
      where: { complaintId },
      include: {
        user: true, // optional: show user info
      },
    });

    if (!comments) {
      throw new NotFoundException('No comments found');
    }

    return comments;
  }
}