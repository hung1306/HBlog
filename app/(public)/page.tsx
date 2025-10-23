"use client";

import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  HiBuildingOffice,
  HiEnvelope,
  HiMapPin,
  HiPhone,
} from "react-icons/hi2";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* ===== Giới thiệu ===== */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hello 👋, I am Nguyen Phuoc Dac Hung
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A Fresher Software Engineer
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://www.linkedin.com/in/hung-nguyen-phuoc-dac/"
            target="_blank"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://github.com/hung1306"
            target="_blank"
            className="hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.facebook.com/HungfromDakLak"
            target="_blank"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://www.instagram.com/_nguyenphuochung/"
            target="_blank"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </section>

      {/* ===== ABOUT ME ===== */}
      <section>
        <h2 className="text-center text-2xl font-semibold mb-8 relative">
          <span className="border-b-2 border-gray-300 pb-1">ABOUT ME</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src="/avatar1.jpg"
              alt="My Avatar"
              className="rounded-3xl w-64 h-64 object-cover shadow-md"
            />
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              As a recent graduate in Computer Science with a solid foundation
              in web and system development, I am eager to secure an opportunity
              as a Software Developer. With a strong drive to learn and quick
              adaptability, I aspire to apply my knowledge in building and
              maintaining software, while also enhancing my expertise under
              seasoned guidance and contributing to collective achievements.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-3">
            <h4 className="text-lg font-semibold">Get in touch</h4>

            <div className="flex items-center space-x-2">
              <HiMapPin size={18} />
              <p>Buon Ma Thuot, Dak Lak</p>
            </div>
            <div className="flex items-center space-x-2">
              <HiBuildingOffice size={18} />
              <p>Ho Chi Minh City</p>
            </div>
            <div className="flex items-center space-x-2">
              <HiEnvelope size={18} />
              <a
                href="mailto:hungnguyenphuocdac@gmail.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                hungnguyenphuocdac@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <HiPhone size={18} />
              <p>0367972391</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaLinkedin size={18} />
              <a
                href="https://www.linkedin.com/in/hung-nguyen-phuoc-dac/"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                linkedin.com/in/hungng
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <FaGithub size={18} />
              <a
                href="https://github.com/hung1306"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                github.com/hung1306
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNICAL SKILLS ===== */}
      <section>
        <h2 className="text-center text-2xl font-semibold mb-8 relative">
          <span className="border-b-2 border-gray-300 pb-1">
            TECHNICAL SKILLS
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Cột 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Programming Languages
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>HTML, CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>C#</li>
                <li>Python</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Frameworks</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>ReactJS</li>
                <li>NextJS</li>
                <li>NodeJS</li>
                <li>ASP.NET</li>
              </ul>
            </div>
          </div>

          {/* Cột 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Database</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Design Database</li>
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>SQL Server</li>
                <li>Entity Framework</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Others</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Git</li>
                <li>Figma</li>
                <li>Agile/Scrum</li>
                <li>Object-Oriented Programming (OOP)</li>
                <li>RESTful API</li>
              </ul>
            </div>
          </div>

          {/* Cột 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Foreign Language</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>TOEIC 625</li>
                <li>Good understanding of English documents</li>
                <li>Basic communication skills</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Soft Skills</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Share ideas clearly and listen actively</li>
                <li>Collaborate effectively with team members</li>
                <li>Plan and manage time to meet deadlines</li>
                <li>Ready to learn new things and handle changes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS / EDUCATION / EXPERIENCE ===== */}
      {["PROJECTS", "EDUCATION", "EXPERIENCES"].map((title) => (
        <section key={title}>
          <h2 className="text-center text-2xl font-semibold mb-8 relative">
            <span className="border-b-2 border-gray-300 pb-1">{title}</span>
          </h2>
        </section>
      ))}
    </div>
  );
}
