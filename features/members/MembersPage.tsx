import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Globe, Github, GraduationCap, Linkedin } from 'lucide-react';
import { membersData } from './data/membersData';
import { Member, MemberRole, roleLabels } from './types';

export const MembersPage = () => {
  // Group members by role
  const groupedMembers = useMemo(() => {
    const groups: Record<MemberRole, Member[]> = {
      professor: [],
      postdoc: [],
      doctor: [],
      master: [],
      bachelor: [],
      alumni: [],
    };

    membersData.forEach(member => {
      groups[member.role].push(member);
    });

    return groups;
  }, []);

  const renderMemberCard = (member: Member, index: number) => {
    const isAlumni = member.role === 'alumni';
    
    return (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#344F1F]/10 group"
      >
        <div className="p-6">
          {/* Photo */}
          <div className="flex items-start gap-4 mb-4">
            {member.photo ? (
              <img
                src={member.photo}
                alt={`${member.name}のプロフィール写真`}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-[#F4991A]/20 group-hover:border-[#F4991A] transition-colors"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#F2EAD3] flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-[#344F1F]">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-[#344F1F] mb-1 group-hover:text-[#F4991A] transition-colors">
                {member.name}
              </h3>
              {member.nameEn && (
                <p className="text-sm text-[#344F1F]/70 mb-2">{member.nameEn}</p>
              )}
              {member.year && (
                <span className="inline-block px-3 py-1 bg-[#F4991A]/10 text-[#F4991A] text-sm font-bold rounded-full">
                  {member.year}
                </span>
              )}
            </div>
          </div>

          {/* Research */}
          {member.research && (
            <div className="mb-4">
              <p className="text-sm font-bold text-[#344F1F]/70 mb-1">研究テーマ</p>
              <p className="text-[#344F1F] leading-relaxed">{member.research}</p>
            </div>
          )}

          {/* Graduation Info (for Alumni) */}
          {isAlumni && member.graduation && (
            <div className="mb-4 p-3 bg-[#F2EAD3]/50 rounded-lg">
              <p className="text-sm text-[#344F1F]/70">
                <span className="font-bold">{member.graduation.year}年度修了</span>
                {member.graduation.nextPosition && (
                  <>
                    <br />
                    <span className="text-xs">→ {member.graduation.nextPosition}</span>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Links */}
          {(member.email || member.links) && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#344F1F]/10">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-[#344F1F]/70 hover:text-[#F4991A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4991A] rounded p-1"
                  aria-label={`${member.name}にメールを送る`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {member.links?.website && (
                <a
                  href={member.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#344F1F]/70 hover:text-[#F4991A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4991A] rounded p-1"
                  aria-label={`${member.name}のウェブサイト`}
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {member.links?.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#344F1F]/70 hover:text-[#F4991A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4991A] rounded p-1"
                  aria-label={`${member.name}のGitHub`}
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {member.links?.scholar && (
                <a
                  href={member.links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#344F1F]/70 hover:text-[#F4991A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4991A] rounded p-1"
                  aria-label={`${member.name}のGoogle Scholar`}
                >
                  <GraduationCap className="w-5 h-5" />
                </a>
              )}
              {member.links?.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#344F1F]/70 hover:text-[#F4991A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4991A] rounded p-1"
                  aria-label={`${member.name}のLinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderSection = (role: MemberRole, members: Member[]) => {
    if (members.length === 0) return null;

    const gridCols = role === 'professor' 
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : role === 'alumni'
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
      <section key={role} className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[#344F1F] mb-2">
            {roleLabels[role].ja}
          </h2>
          <p className="text-[#344F1F]/70">{roleLabels[role].en}</p>
        </motion.div>

        <div className={`grid ${gridCols} gap-6`}>
          {members.map((member, index) => renderMemberCard(member, index))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-[#F9F5F0]">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-4">
              メンバー
            </h1>
            <p className="text-lg text-[#344F1F]/70">
              研究室メンバーの紹介 / Lab Members
            </p>
          </motion.div>
        </div>
      </div>

      {/* Members */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderSection('professor', groupedMembers.professor)}
        {renderSection('postdoc', groupedMembers.postdoc)}
        {renderSection('doctor', groupedMembers.doctor)}
        {renderSection('master', groupedMembers.master)}
        {renderSection('bachelor', groupedMembers.bachelor)}
        {renderSection('alumni', groupedMembers.alumni)}
      </div>
    </div>
  );
};
