import { Test, TestingModule } from '@nestjs/testing';
import { GoodService } from './good.service';
import { Model } from 'mongoose';

describe('GoodService', () => {
  let service: GoodService;
  let goodModel: Model<any>;

  const mockGoodModel = {
    aggregate: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoodService,
        {
          provide: 'GoodModel',
          useValue: mockGoodModel,
        },
      ],
    }).compile();

    service = module.get<GoodService>(GoodService);
    goodModel = module.get<Model<any>>('GoodModel');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGoodsByDiscountСlassificationUser', () => {
    it('should return goods by discount classification for a user', async () => {
      const mockResult = [{ name: 'Good 1' }, { name: 'Good 2' }];
      mockGoodModel.aggregate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodsByDiscountСlassificationUser(
        'test@example.com',
        'discount',
        { offset: 0, limit: 10 },
      );

      expect(result).toEqual(mockResult);
      expect(mockGoodModel.aggregate).toHaveBeenCalled();
    });
  });

  describe('getGoodFindByKeyword', () => {
    it('should return goods by keyword', async () => {
      const mockResult = [{ name: 'Good 1' }];
      mockGoodModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodFindByKeyword('keyword', {
        offset: 0,
        limit: 10,
      });

      expect(result).toEqual(mockResult);
      expect(mockGoodModel.find).toHaveBeenCalledWith({
        $text: { $search: 'keyword' },
      });
    });
  });

  describe('getGoodsByCategory', () => {
    it('should return goods by category', async () => {
      const mockResult = [{ name: 'Good 1' }];
      mockGoodModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodsByCategory(
        { category: 'electronics' },
        { offset: 0, limit: 10 },
      );

      expect(result).toEqual(mockResult);
      expect(mockGoodModel.find).toHaveBeenCalledWith({
        category: { $in: 'electronics' },
      });
    });
  });

  describe('getGoodsByIds', () => {
    it('should return goods by IDs', async () => {
      const mockResult = [{ name: 'Good 1' }];
      mockGoodModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodsByIds(
        { ids: ['id1', 'id2'] },
        { offset: 0, limit: 10 },
      );

      expect(result).toEqual(mockResult);
      expect(mockGoodModel.find).toHaveBeenCalledWith({
        _id: { $in: ['id1', 'id2'] },
      });
    });
  });

  describe('getGoodsByDiscountСlassification', () => {
    it('should return goods by discount classification', async () => {
      const mockResult = [{ name: 'Good 1' }];
      mockGoodModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodsByDiscountСlassification(
        'discount',
        { offset: 0, limit: 10 },
      );

      expect(result).toEqual(mockResult);
      expect(mockGoodModel.find).toHaveBeenCalledWith({
        discount: { $exists: true },
      });
    });
  });

  describe('getGoodById', () => {
    it('should return a good by ID', async () => {
      const mockResult = { name: 'Good 1' };
      mockGoodModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodById('id1');

      expect(result).toEqual(mockResult);
      expect(mockGoodModel.findById).toHaveBeenCalledWith('id1');
    });
  });

  describe('getGoodByIdForUser', () => {
    it('should return a good by ID for a user', async () => {
      const mockResult = [{ name: 'Good 1' }];
      mockGoodModel.aggregate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await service.getGoodByIdForUser('id1', 'test@example.com');

      expect(result).toEqual(mockResult[0]);
      expect(mockGoodModel.aggregate).toHaveBeenCalled();
    });
  });
});