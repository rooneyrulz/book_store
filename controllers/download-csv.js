import path from 'path';

// Importing model
import Book from '../models/bookSchema';

// Importing writing data
import { writeBooks } from '../lib/data-write';

// @Description     > Downloading books into csv file
// @Route           > /api/download-csv
// @Access Control  > Private
export default async (req, res, next) => {
  const userId = req.user.id;
  // const dataFilePath = path.resolve(__dirname, '../data', 'books.csv');
  // const downloadFilePath = path.resolve(__dirname, '../downloads');

  try {
    const books = await Book.find({ author: userId }).exec();

    if (books.length < 1) {
      return res.status(409).json({
        msg: `Books not found!`,
      });
    }

    const booksList = books.map(book => ({ ...book._doc }));

    await writeBooks(booksList);

    // return res.download(downloadFilePath, dataFilePath);

    return res.status(200).json({
      written: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
