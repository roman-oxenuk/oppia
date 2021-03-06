// Copyright 2020 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for SelectSkillModalController.
 */

// TODO(#7222): Remove usage of importAllAngularServices once upgraded to
// Angular 8.

import { importAllAngularServices } from 'tests/unit-test-utils';
describe('Select Skill Modal Controller', function() {
  var $scope = null;
  var $uibModalInstance = null;
  var allowSkillsFromOtherTopics = true;
  var categorizedSkills = {
    'Dummy Topic': {
      Subtopic1: [{id: '4'}]
    }
  };
  var skillsInSameTopicCount = 3;
  var sortedSkillSummaries = [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }];
  importAllAngularServices();

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.inject(function($injector, $controller) {
    var $rootScope = $injector.get('$rootScope');

    $uibModalInstance = jasmine.createSpyObj(
      '$uibModalInstance', ['close', 'dismiss']);

    $scope = $rootScope.$new();
    $controller('SelectSkillModalController', {
      $scope: $scope,
      $uibModalInstance: $uibModalInstance,
      allowSkillsFromOtherTopics: allowSkillsFromOtherTopics,
      categorizedSkills: categorizedSkills,
      skillsInSameTopicCount: skillsInSameTopicCount,
      sortedSkillSummaries: sortedSkillSummaries,
      skillSummaries: [{id: '9'}],
      untriagedSkillSummaries: [{id: '10'}]
    });
  }));

  it('should initialize $scope properties after controller is initialized',
    function() {
      expect($scope.skillSummaries).toEqual(sortedSkillSummaries);
      expect($scope.categorizedSkills).toEqual(categorizedSkills);
      expect($scope.allowSkillsFromOtherTopics).toEqual(
        allowSkillsFromOtherTopics);
      expect($scope.selectedSkillId).toBe(null);
      expect($scope.countOfSkillsToPrioritize).toBe(skillsInSameTopicCount);
    });

  it('should save skill with its id when closing modal', function() {
    $scope.selectedSkillId = '2';
    $scope.save();

    expect($scope.selectedSkillId).toBe('2');
    expect($uibModalInstance.close).toHaveBeenCalledWith({
      id: '2'
    });
  });
});
