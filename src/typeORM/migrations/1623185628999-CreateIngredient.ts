import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateIngredient1623185628999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'ingredient',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'kcal_value',
                        type: 'real',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'info',
                        type: 'varchar',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ingredient');
    }

}
