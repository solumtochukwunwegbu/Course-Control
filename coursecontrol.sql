-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2025 at 11:28 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursecontrol`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `titleID` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `video` varchar(1000) NOT NULL,
  `rating` int(11) NOT NULL,
  `price` double NOT NULL,
  `description` text NOT NULL,
  `fullDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`titleID`, `title`, `video`, `rating`, `price`, `description`, `fullDescription`) VALUES
(1, 'Coding', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 5, 40000, 'Turn coffee into code. Learn to build, break, and debug without crying (much).', 'This course provides a comprehensive introduction to the fundamentals of computer programming.\r\n   Designed for beginners, it covers essential concepts such as variables, control structures, functions, data types, and basic algorithms. \r\n   Students will gain hands-on experience by writing and debugging code in a modern programming language (e.g., Python, Java, or JavaScript). \r\n   By the end of the course, learners will have built several small projects and will be well-prepared to tackle more advanced programming challenges.'),
(2, 'Mechanics', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 4, 30000, 'Things move, things break—we explain why, and how to fix them without duct tape. Mostly.', 'Explore the fundamental principles that govern motion and forces in the physical world. This course covers topics such as Newtonian mechanics, energy, momentum, and rotational dynamics, providing a solid foundation for students interested in physics or engineering.'),
(3, 'Economics', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 5, 50000, 'Why is everything so expensive? Let’s decode the world with supply, demand, and sass.', 'Understand how societies allocate resources and make decisions. This course introduces microeconomics and macroeconomics, covering supply and demand, market structures, inflation, economic growth, and global trade. Perfect for those curious about how the economy works on both local and global levels.'),
(4, 'Photography', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 5, 15000, 'Take photos that wow — not ones you delete five seconds later.', 'Learn the art and science of capturing compelling images. This course teaches camera basics, composition, lighting, and post-processing techniques, empowering students to express their creativity through photography — whether on a DSLR or smartphone.'),
(5, 'Public Speaking', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 4, 20000, 'Stop mumbling. Start commanding the room with confidence.', 'Build confidence and clarity in verbal communication. This course helps students craft effective speeches, improve body language and vocal delivery, and handle nerves and audience interaction, preparing them for presentations, interviews, and leadership roles.'),
(6, 'Entrepreneurship', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 5, 30000, 'Got big ideas? Let’s turn them into businesses — minus the chaos.', 'Develop the mindset and skills to turn ideas into action. This course walks students through the entrepreneurial process — from identifying opportunities and creating business plans to pitching, funding, and launching ventures. Real-world examples and case studies bring innovation to life.'),
(7, 'History', 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7', 4, 30000, 'History isn’t boring — it’s just old drama with cooler outfits.', 'Travel through time to explore key events, cultures, and figures that shaped our world. This course encourages critical thinking and contextual understanding as students study major civilizations, global conflicts, and transformative movements across centuries.');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `userID` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profilePic` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`titleID`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `titleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
