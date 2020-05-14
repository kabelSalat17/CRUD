const Crud = artifacts.require('Crud');

contract('Crud', () => {
    let crud = null;
    before(async() => {
        crud = await Crud.deployed();
    })
    it('Should create a new user', async () => {
        await crud.create('Frank');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Frank');
    });
    it('Should update a user', async () => {
        await crud.update(1, 'newFrank');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'newFrank');
    });
    it('Should not update an non-existing user', async () => {
        try {
            await crud.update(2, 'Joe');
        } catch (e) {
            assert(e.message.includes('User does not exist!'));

            return;
        }
        assert(false)
    });
    it('Should destroy an user', async () => {
        await crud.destroy(1);
        try {
            await crud.read(1);
        } catch (e) {
            assert(e.message.includes('User does not exist!'));

            return;
        }
        assert(false)
    });
    it('Should not destroy an non-existing user', async () => {
        try {
            await crud.destroy(10);
        } catch (e) {
            assert(e.message.includes('User does not exist!'));

            return;
        }
        assert(false)
    });
});


