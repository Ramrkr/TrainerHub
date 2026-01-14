import { FilterByTitleOrDepartmentPipe } from './filter-by-title-or-department.pipe';

describe('FilterByTitleOrDepartmentPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByTitleOrDepartmentPipe();
    expect(pipe).toBeTruthy();
  });
});
