<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200304191254 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE orderdetails_supplements (id INT AUTO_INCREMENT NOT NULL, order_detail_id INT DEFAULT NULL, supplement_id INT DEFAULT NULL, INDEX IDX_CEA6696B64577843 (order_detail_id), INDEX IDX_CEA6696B7793FA21 (supplement_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE orderdetails_supplements ADD CONSTRAINT FK_CEA6696B64577843 FOREIGN KEY (order_detail_id) REFERENCES order_detail (id)');
        $this->addSql('ALTER TABLE orderdetails_supplements ADD CONSTRAINT FK_CEA6696B7793FA21 FOREIGN KEY (supplement_id) REFERENCES supplement (id)');
        $this->addSql('ALTER TABLE order_detail DROP supplements');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE orderdetails_supplements');
        $this->addSql('ALTER TABLE order_detail ADD supplements LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
