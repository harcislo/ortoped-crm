import { FC } from 'react';
import DataTable from '../../../components/DataTable';
// import { getLocalizationSelector } from '../../../selectors/DirectoriesSelectors'
// import { getLocalization } from '../../../actions/DirectoriesActions'

/**
 * Справочник "Локализации"
 * @returns JSX
 */
const BodyLocationsDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Локализация',
      dataIndex: 'name',
      filterSearch: true,
      // TODO search + sort
    },
  ];

  return (
    <div>Location</div>
    // <DataTable
    //     title="Локализации"
    // getDataAction={getLocalization}
    // dataSelector={getLocalizationSelector}
    //     columns={columns}
    //     params={['name']}
    //     addButtonText="Добавить"
    //     onCreate={() => {}}
    //     editable={true}
    //     deletable={true}
    //     addable={true}
    // />
  );
};

export default BodyLocationsDirectory;
